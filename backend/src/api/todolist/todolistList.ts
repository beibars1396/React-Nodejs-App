import Permissions from "../../security/permissions";
import PermissionChecker from "../../services/user/permissionChecker";
import ApiResponseHandler from "../apiResponseHandler"
import TodolistService from "../../services/todolistService";

export default async (req ,res, next) => {
    try {
        const payload = await new TodolistService(
            req
        ).findAndCountAll(req.query);

        await ApiResponseHandler.success(req, res, payload);
    } catch(error) {
        await ApiResponseHandler.error(req, res, error);
    }
} 