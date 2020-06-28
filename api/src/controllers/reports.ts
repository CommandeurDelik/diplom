import { Report } from 'entities';
import { catchErrors } from 'errors';

export const getProjectReports = catchErrors(async (req, res) => {
  const { projectId } = req.currentUser;
  const where = 'report.projectId = :projectId';

  const reports = await Report.createQueryBuilder('report')
    .select()
    .where(where, { projectId })
    .getMany();

  res.respond({ reports });
});

export const create = catchErrors(async (req, res) => {
  const report = Report.create();
  report.name = req.body.name;
  report.file = req.body.file;
  report.projectId = req.body.projectId ? req.body.projectId : req.currentUser.projectId;

  await report.save();
  res.respond({ report });
});

export const remove = catchErrors(async (req, res) => {
  const report = Report.create();
  report.id = req.body.id;
  await report.remove();
  res.respond({});
});
