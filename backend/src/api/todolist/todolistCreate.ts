import Permissions from "../../security/permissions";
import TodolistService from "../../services/todolistService";
import PermissionChecker from "../../services/user/permissionChecker";
import ApiResponseHandler from "../apiResponseHandler"

export default async (req, res, next) => {
    try {
        const payload = await new TodolistService(req).create(
            req.body.data
        );

        await ApiResponseHandler.success(req, res, payload);
    } catch(error) {
        await ApiResponseHandler.error(req, res, error);
    }
} 