import * as yup from 'yup';
// import { i18n } from 'src/i18n';
import moment from 'moment';

const yupFilterSchemas = {
  generic(label) {
    return yup.mixed().label(label);
  },
  string(label) {
    return yup
      .string()
      .transform((cv, ov) => {
        return ov === '' ? null : cv;
      })
      .nullable()
      .trim()
      .label(label);
  },
  stringArray(label) {
    let yupChain = yup
      .array()
      .compact()
      .ensure()
      .of(
        yup
          .string()
          .transform((cv, ov) => {
            return ov === '' ? null : cv;
          })
          .trim(),
      )
      .label(label)
      .transform((value, originalValue) => {
        if (!originalValue) {
          return originalValue;
        }

        if (Array.isArray(originalValue)) {
          return originalValue;
        }

        return [originalValue];
      });

    return yupChain;
  },
  boolean(label) {
    return yup.bool().nullable().label(label);
  },
  relationToOne(label) {
    return yup
      .mixed()
      .label(label)
      .transform((value, originalValue) => {
        if (!originalValue) {
          return null;
        }

        return originalValue.id;
      });
  },
  relationToMany(label) {
    return yup
      .mixed()
      .label(label)
      .transform((value, originalValue) => {
        if (!originalValue || !originalValue.length) {
          return [];
        }

        return originalValue.map((item) => item.id);
      });
  },
  json(label) {
    return yup.mixed().label(label);
  },
  integer(label) {
    return yup
      .number()
      .transform((cv, ov) => {
        return ov === '' ? null : cv;
      })
      .integer()
      .nullable()
      .label(label);
  },
  integerRange(label) {
    return yup.mixed().label(label);
  },
  enumerator(label) {
    return yup
      .string()
      .transform((cv, ov) => {
        return ov === '' ? null : cv;
      })
      .label(label)
      .nullable();
  },
  email(label) {
    return yup
      .string()
      .transform((cv, ov) => {
        return ov === '' ? null : cv;
      })
      .nullable()
      .trim()
      .label(label);
  },
  decimal(label) {
    let yupChain = yup
      .number()
      .transform((cv, ov) => {
        return ov === '' ? null : cv;
      })
      .nullable()
      .label(label);

    return yupChain;
  },
  decimalRange(label) {
    return yup
      .array()
      .ensure()
      .compact()
      .of(
        yup
          .number()
          .transform((cv, ov) => {
            return ov === '' ? null : cv;
          })
          .nullable()
          .label(label),
      )
      .label(label);
  },
  datetime(label) {
    let yupChain = yup
      .mixed()
      .nullable()
      .label(label)
      .transform((value, originalValue) =>
        originalValue
          ? moment(
              originalValue,
              'DD-MM-YYYY HH:mm',
            ).toISOString()
          : null,
      );

    return yupChain;
  },
  datetimeRange(label) {
    return yup.mixed().label(label);
  },
  date(label) {
    return yup
      .mixed()
      .nullable()
      .label(label)
      .test(
        'is-date',
        'validation.mixed.default',
        (value) => {
          if (!value) {
            return true;
          }

          return moment(value, 'DD-MM-YYYY').isValid();
        },
      );
  },
  dateRange(label) {
    return yup
      .array()
      .ensure()
      .compact()
      .of(
        yup
          .mixed()
          .nullable()
          .label(label)
          .test(
            'is-date',
            'validation.mixed.default',
            (value) => {
              if (!value) {
                return true;
              }

              return moment(value, 'DD-MM-YYYY').isValid();
            },
          )
          .transform((value) =>
            value
              ? moment(value).format('DD-MM-YYYY')
              : null,
          ),
      )
      .label(label);
  },
};

export default yupFilterSchemas;
