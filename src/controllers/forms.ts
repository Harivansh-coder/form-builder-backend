// contains contollers for form routes
import Form from "@/models/form";
import Question from "@/models/question";
import { Request, RequestHandler, Response } from "express";

// create a new form
export const createFormController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { title, description, headerImage } = req.body;

    const form = new Form({ title, description, headerImage });
    await form.save();

    res.status(201).json(form);
  } catch (error) {
    res.status(500).json({ error: "Error creating form" });
  }
};

// get all forms

export const getFormsController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id: formID } = req.params;

    if (formID) {
      const form = await Form.findById(formID).populate("questions");
      if (!form) {
        res.status(404).json({ error: "Form not found" });
        return;
      }
      res.status(200).json(form);
      return;
    }

    const forms = await Form.find().populate("questions");
    res.status(200).json(forms);
  } catch (error) {
    console.error("Error getting forms:", error); // Optional logging for debugging
    res.status(500).json({ error: "Error getting forms" });
  }
};

// update a form
export const updateFormController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const formID = req.params.id;
    const { title, description, headerImage } = req.body;

    const updatedForm = await Form.findByIdAndUpdate(
      formID,
      { title, description, headerImage },
      { new: true }
    );

    if (!updatedForm) {
      res.status(404).json({ error: "Form not found" });
      return;
    }

    res.status(200).json(updatedForm);
  } catch (error) {
    res.status(500).json({ error: "Error updating form" });
  }
};

// delete a form
export const deleteFormController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const formID = req.params.id;

    // Use findByIdAndDelete directly; it will return the deleted form or null
    const form = await Form.findByIdAndDelete(formID);

    if (!form) {
      res.status(404).json({ error: "Form not found" });
      return;
    }

    // delete all questions associated with the form
    await Question.deleteMany({ form: formID });

    res.status(204).send(); // 204 No Content, no body is needed
  } catch (error) {
    console.error("Error deleting form:", error); // Optional logging for debugging
    res.status(500).json({ error: "Error deleting form" });
  }
};
