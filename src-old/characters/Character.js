class Character {
  constructor(props = {}) {
    this.data = props.data || null;
    this.privacy = props.privacy || 1;
    this.equipment = props.equipment || null;
  }

  classType() {
    if (!this.data) return false;
    switch (this.data.classType) {
      case 0:
        return 'titan';
      case 1:
        return 'hunter';
      case 2:
        return 'warlock';
      default:
        return false;
    }
  }

  getEquipment() {
    return this.equipment ? this.equipment.data : false;
  }
}

module.exports = Character;
