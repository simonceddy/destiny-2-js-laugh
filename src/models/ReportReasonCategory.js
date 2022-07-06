const Model = require('./Model');

class ReportReasonCategory extends Model {
  static table = 'DestinyReportReasonCategoryDefinition';

  constructor(hash) {
    super(hash, ReportReasonCategory.table);
  }
}

module.exports = ReportReasonCategory;
