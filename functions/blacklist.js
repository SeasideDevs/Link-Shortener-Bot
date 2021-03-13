module.exports = {
  async check(userID, database) {
    const result = await database.findOne({
      userID: userID,
    });

    if (!result) {
      return false;
    }

    return result;
  },
  async add(userID, database, reason, moderator, appealable, blacklistedAt, ignoreUser) {
    if (!this.check(userID, database)) {
      return "wow already blacklisted"
    }
  },
  async remove() {},
};
