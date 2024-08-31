import express from "express";
import { deleteCode, editCode, getAllCodes, loadCode, saveCode } from "../controllers/compilerController";
import {  VerifyTokenAnonymous } from "../middlewares/VerifyTokenAnonymous";
import { verifyToken } from "../middlewares/verifyToken";

export  const compilerRouter = express.Router();


compilerRouter.post("/save", VerifyTokenAnonymous, saveCode);
compilerRouter.delete('/delete/:id', verifyToken, deleteCode);
compilerRouter.put('/edit/:id',verifyToken, editCode);
compilerRouter.post("/load",VerifyTokenAnonymous, loadCode)
compilerRouter.get("/get-all-codes", getAllCodes);
