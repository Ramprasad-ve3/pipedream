import base from "../common/webhooks.mjs";

export default {
  ...base,
  key: "fibery-entity-created",
  name: "New Entity Created",
  description: "Emit new event for every created entity of a certain type",
  type: "source",
  version: "0.0.1",
  async run(event) {
    console.log(`Received new event with ${event.body.effects.length} sequence(s)`);
    event.body.effects
      .filter(({ effect }) => effect === "fibery.entity/create")
      .forEach((effect) => {
        this.$emit(effect, {
          summary: `New created entity: ${effect.id}`,
          ts: effect["fibery/creation-date"],
        });
      });
  },
};