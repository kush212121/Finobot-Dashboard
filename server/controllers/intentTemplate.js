import IntentTemplate, {
  MultiIntentTemplate,
} from "../models/intentTemplate.js";

export const getIntentTemplate = async (req, res) => {
  const { intentName } = req.params;

  try {
    if (intentName) {
      const reqIntent = await IntentTemplate.find({ intentName });

      if (reqIntent) return res.send(200).json(reqIntent);
      else
        return res
          .send(404)
          .json({ message: `No intent with name ${intentName} found` });
    }

    const intents = await IntentTemplate.find();

    return res.status(200).json(intents);
  } catch (error) {
    console.log({ error: error.message });
    return res.status(409).json({ message: error.message });
  }
};

export const createIntentTemplate = async (req, res) => {
  const { body: intents } = req;

  try {
    await intents
      .filter(({ multiIntents: mIns }) => mIns)
      .forEach((intent) => {
        console.log({ mIntents: intent.multiIntents });
        MultiIntentTemplate.collection.insertMany(
          intent.multiIntents,
          (err, docs) => {
            console.log({ docs });

            if (docs) {
              intent.multiIntents = Object.values(docs.insertedIds);
              console.log({ intent });
            }
          }
        );
      });

    if (!intents) {
      return res
        .status(400)
        .json({ message: "Bad request, no intents supplied" });
    }

    // const addedIntents = await IntentTemplate.collection.insertMany(intents);

    // return res.status(201).json(addedIntents);
    return res.status(200).json(intents);
  } catch (error) {
    console.log({ error: error.message });
    return res.status(409).json({ message: error.message });
  }
};
