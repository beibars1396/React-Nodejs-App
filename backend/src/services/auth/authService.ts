import UserRepository from '../../database/repositories/userRepository';
import Error400 from '../../errors/Error400';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SequelizeRepository from '../../database/repositories/sequelizeRepository';
import { getConfig } from '../../config';
import Error401 from '../../errors/Error401';
import moment from 'moment';

const BCRYPT_SALT_ROUNDS = 12;

class AuthService {

  static async signup(
    email,
    password,
    invitationToken,
    tenantId,
    options: any = {},
  ) {
    
    const transaction = await SequelizeRepository.createTransaction(
      options.database,
    );
      
    try {
      email = email.toLowerCase();
      
      const existingUser = await UserRepository.findByEmail(
        email,
        options,
      );

      // Generates a hashed password to hide the original one.
      const hashedPassword = await bcrypt.hash(
        password,
        BCRYPT_SALT_ROUNDS,
      );

      // The user may already exist on the database in case it was invided.
      if (existingUser) {
        // If the user already have an password,
        // it means that it has already signed up
        const existingPassword = await UserRepository.findPassword(
          existingUser.id,
          options,
        );

        if (existingPassword) {
          throw new Error400(
            options.language,
            'auth.emailAlreadyInUse',
          );
        }

        /**
         * In the case of the user exists on the database (was invited)
         * it only creates the new password
         */
        await UserRepository.updatePassword(
          existingUser.id,
          hashedPassword,
          false,
          {
            ...options,
            transaction,
            bypassPermissionValidation: true,
          },
        );

        const token = jwt.sign(
          { id: existingUser.id },
          'a40a8850-24b2-4023-85ce-1765d10c849b-758df0c2-b112-4851-960d-1b7163d3ccd6',
          { expiresIn: "7 days" },
        );

        await SequelizeRepository.commitTransaction(
          transaction,
        );

        return token;
      }

      const newUser = await UserRepository.createFromAuth(
        {
          firstName: email.split('@')[0],
          password: hashedPassword,
          email: email,
        },
        {
          ...options,
          transaction,
        },
      );

      const token = jwt.sign(
        { id: newUser.id },
        'a40a8850-24b2-4023-85ce-1765d10c849b-758df0c2-b112-4851-960d-1b7163d3ccd6',
        { expiresIn: "7 days" },
      );

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return token;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      throw error;
    }
  }

  static async findByEmail(email, options: any = {}) {
    email = email.toLowerCase();
    return UserRepository.findByEmail(email, options);
  }

  static async signin(
    email,
    password,
    invitationToken,
    tenantId,
    options: any = {},
  ) {
    const transaction = await SequelizeRepository.createTransaction(
      options.database,
    );

    try {
      email = email.toLowerCase();
      const user = await UserRepository.findByEmail(
        email,
        options,
      );

      if (!user) {
        throw new Error400(
          options.language,
          'auth.userNotFound',
        );
      }

      const currentPassword = await UserRepository.findPassword(
        user.id,
        options,
      );

      if (!currentPassword) {
        throw new Error400(
          options.language,
          'auth.wrongPassword',
        );
      }

      const passwordsMatch = await bcrypt.compare(
        password,
        currentPassword,
      );

      if (!passwordsMatch) {
        throw new Error400(
          options.language,
          'auth.wrongPassword',
        );
      }

      const token = jwt.sign(
        { id: user.id },
        'a40a8850-24b2-4023-85ce-1765d10c849b-758df0c2-b112-4851-960d-1b7163d3ccd6',
        { expiresIn: "7 days" },
      );

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return token;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      throw error;
    }
  }

  static async findByToken(token, options) {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        'a40a8850-24b2-4023-85ce-1765d10c849b-758df0c2-b112-4851-960d-1b7163d3ccd6',
        (err, decoded) => {
          if (err) {
            reject(err);
            return;
          }

          const id = decoded.id;
          const jwtTokenIat = decoded.iat;

          UserRepository.findById(id, {
            ...options,
            bypassPermissionValidation: true,
          })
            .then((user) => {
              const isTokenManuallyExpired =
                user &&
                user.jwtTokenInvalidBefore &&
                moment
                  .unix(jwtTokenIat)
                  .isBefore(
                    moment(user.jwtTokenInvalidBefore),
                  );

              if (isTokenManuallyExpired) {
                reject(new Error401());
                return;
              }

              resolve(user);
            })
            .catch((error) => reject(error));
        },
      );
    });
  }
}

export default AuthService;
