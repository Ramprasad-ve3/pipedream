import base from "../common/webhooks.mjs";

export default {
  ...base,
  key: "fibery-entity-updated",
  name: "Entity Updated",
  description: "Emit new event for every updated entity of a certain type",
  type: "source",
  version: "0.0.1",
  methods: {
    ...base.methods,
    hasUpdatedValue(valuesBefore) {
      return Object.keys(valuesBefore).length > 1;
    },
  },
  async run(event) {
    console.log(`Received new event with ${event.body.effects.length} sequence(s)`);
    event.body.effects
      .filter(({ effect }) => effect === "fibery.entity/update")
      .filter(({ valuesBefore }) => this.hasUpdatedValue(valuesBefore))
      .forEach((effect) => {
        this.$emit(effect, {
          summary: `Updated entity: ${effect.id}`,
          ts: effect["fibery/modification-date"],
        });
      });
  },
};