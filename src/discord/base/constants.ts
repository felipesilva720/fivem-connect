import constantsJson from "../../../constants.json" with { type: "json" };

declare global {
    const constants: typeof constantsJson;
    const flags: ["Ephemeral"];
    const required: true;
    const autocomplete: true
}
Object.assign(globalThis, Object.freeze({
    constants: constantsJson,
    flags: ["Ephemeral"],
    required: true,
    autocomplete: true
}));
