const defaultPlayerProps = {
  data: {
    iconPath: null,
    crossSaveOverride: null,
    applicableMembershipTypes: [],
    isPublic: null,
    membershipType: null,
    membershipId: null,
    displayName: null,
    bungieGlobalDisplayName: null,
    bungieGlobalDisplayNameCode: null,
  },
  profile: {
    data: {
      userInfo: {},
      dateLastPlayed: null,
      versionsOwned: null,
      characterIds: [],
      seasonHashes: [],
      currentSeasonHash: null,
      currentSeasonRewardPowerCap: null
    },
    privacy: 1,
  }
};

module.exports = defaultPlayerProps;
