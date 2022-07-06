const Collectible = require('./Collectible');
const DamageType = require('./DamageType');
const ItemCategory = require('./ItemCategory');
const Model = require('./Model');
const Stat = require('./Stat');
// const StatGroup = require('./StatGroup');

class InventoryItem extends Model {
  static table = 'DestinyInventoryItemDefinition';

  constructor(hash) {
    super(hash, InventoryItem.table);
  }

  async handleData(data = {}) {
    this.displayProperties = data.displayProperties;
    if (data.stats) {
      this.stats = await Promise.all(
        Object.values(data.stats.stats)
          .map(async (s) => {
            const stat = await new Stat(s.statHash, s.value).populate();
            return stat;
          })
      );
    }
    if (data.investmentStats) {
      this.investmentStats = await Promise.all(data.investmentStats
        .map(async (s) => {
          const stat = await new Stat(s.statTypeHash, s.value).populate();
          return stat;
        }));
    }
    if (data.collectibleHash) {
      this.collectible = await new Collectible(data.collectibleHash)
        .populate();
    }
    if (data.itemCategoryHashes) {
      this.itemCategories = await Promise.all(data.itemCategoryHashes
        .map(async (h) => {
          const category = await new ItemCategory(h).populate();
          return category;
        }));
    }
    if (data.damageTypeHashes) {
      this.damageTypes = await Promise.all(data.damageTypeHashes
        .map(async (h) => {
          const damageType = await new DamageType(h).populate();
          return damageType;
        }));
      this.defaultDamageType = this.damageTypes
        .find((dt) => dt.hash === data.defaultDamageTypeHash);
    }
  }

  stats() {
    if (this.data.stats) {
      console.log(this.data.stats);
    }
  }

  get quality() {
    return this.data && this.data.inventory ? this.data.inventory.tierTypeName : null;
  }
}

module.exports = InventoryItem;
