import { Request, Response } from "express";
import { saveProvider } from "../../domain/services/provider-services";
import { buildProviderRequest, ProviderRequest } from "../dtos/provider-dtos";
import { MongoProviderReposiitory } from "../../infraestructure/repositories/mongo-provider";
import { ProviderModel } from "../../infraestructure/database/provider-mongo";

const providerRepo = new MongoProviderReposiitory();

export const createProvider = async (request: Request, response: Response) => {
    try {
        const newProvider = buildProviderRequest(request.body);
        const result = await saveProvider(providerRepo, newProvider);
        response.status(201).json({
            ok: true,
            message: 'Provider created successfully',
            provider: result
        });
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: 'Internal server error',
            error: (error as Error).message
        });
    }
}

export const getProviders = async (request: Request, response: Response) => {
    try {
        const providers = await providerRepo.findAll();
        response.status(200).json({ ok: true, providers });
    } catch (error) {
        return response.status(500).json({
            ok: false,  
            message: 'Internal server error',
            error: (error as Error).message
        });
    }   
}

export const getProviderById = async (request: Request, response: Response) => {
    try {
        const providerId: string = request.params.id;
        const provider = await providerRepo.findById(providerId);
        if (!provider) {
            return response.status(404).json({
                ok: false,
                message: 'Provider not found'
            });
        }
        response.status(200).json({
            ok: true,
            provider
        });
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: 'Internal server error',
            error: (error as Error).message
        });
    }
}