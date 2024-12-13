import FormResponse from "@/models/response";
import { Request, Response } from "express";

export const submitResponseController = async (req: Request, res: Response) => {
  try {
    const formId = req.params.formId;
    const { response, userId } = req.body;
    const newResponse = await FormResponse.create({
      form: formId,
      responses: response,
      userId,
    });

    res.status(201).json(newResponse);
  } catch (error) {
    res.status(500).json({ message: "Failed to submit response" });
  }
};

// get all responses for a form
export const getResponsesController = async (req: Request, res: Response) => {
  try {
    const formId = req.params.formId;
    const responses = await FormResponse.find({ form: formId });

    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ message: "Failed to get responses" });
  }
};

// delete all responses for a form
export const deleteResponsesController = async (
  req: Request,
  res: Response
) => {
  try {
    const formId = req.params.formId;

    // if formId is not provided, delete all responses
    if (!formId) {
      await FormResponse.deleteMany({});
    } else {
      const forms = await FormResponse.findByIdAndDelete(formId);

      if (!forms) {
        res.status(404).json({ message: "Form not found" });

        return;
      }
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete responses" });
  }
};
