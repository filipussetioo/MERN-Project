import express from "express";
import { Summary } from "../models/sumModel.js";

const router = express.Router();

// API 1.A
router.get('/uniqueUsersPerDay', async (req, res) => {
  try {
    const uniqueUsersPerDay = await Summary.aggregate([
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$Date' } },
            email: '$Email',
          }
        }
      },
      {
        $group: {
          _id: '$_id.date',
          jumlahUniqueUser: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          jumlahUniqueUser: 1
        }
      },
      {
        $sort: { date: 1 }
      }
    ]);

    res.json(uniqueUsersPerDay);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// API 1.B
router.get('/uniqueUsersAll', async (req, res) => {
  try {
    const uniqueUsers = await Summary.aggregate([
      {
        $group: {
          _id: {
            email: '$Email',
            date: { $dateToString: { format: '%Y-%m-%d', date: '$Date' } },
            locationType: '$Name of Location'
          }
        }
      },
      {
        $group: {
          _id: null,
          jumlahUniqueUser: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          jumlahUniqueUser: 1
        }
      }
    ]);

    res.json(uniqueUsers[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// API 1.C
router.get('/newAndReturningPerDay', async (req, res) => {
  try {
    const newAndReturningPerDay = await Summary.aggregate([
      {
        $group: {
          _id: {
            email: '$Email',
            date: { $dateToString: { format: '%Y-%m-%d', date: '$Date' } },
          },
          firstAccess: { $min: '$Date' }
        }
      },
      {
        $group: {
          _id: '$_id.date',
          users: {
            $push: {
              email: '$_id.email',
              firstAccess: '$firstAccess'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          newUsers: {
            $size: {
              $filter: {
                input: '$users',
                as: 'user',
                cond: {
                  $eq: ['$$user.firstAccess', { $toDate: '$_id' }]
                }
              }
            }
          },
          returningUsers: {
            $size: {
              $filter: {
                input: '$users',
                as: 'user',
                cond: {
                  $ne: ['$$user.firstAccess', { $toDate: '$_id' }]
                }
              }
            }
          }
        }
      },
      {
        $sort: { date: 1 }
      }
    ]);

    res.json(newAndReturningPerDay);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// API 1.D
router.get('/newAndReturningTotal', async (req, res) => {
  try {
    const newAndReturningTotal = await Summary.aggregate([
      {
        $sort: { Date: 1 }
      },
      {
        $group: {
          _id: '$Email',
          firstAccess: { $first: '$Date' },
          accessDates: { $push: '$Date' }
        }
      },
      {
        $unwind: '$accessDates'
      },
      {
        $project: {
          _id: 0,
          email: '$_id',
          date: '$accessDates',
          isNew: { $eq: ['$firstAccess', '$accessDates'] }
        }
      },
      {
        $group: {
          _id: null,
          newUsers: { $sum: { $cond: ['$isNew', 1, 0] } },
          returningUsers: { $sum: { $cond: ['$isNew', 0, 1] } }
        }
      },
      {
        $project: {
          _id: 0,
          newUsers: 1,
          returningUsers: 1
        }
      }
    ]);

    // Since there will be only one result (total), return the first element of the array
    res.json(newAndReturningTotal[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// API 1.E
router.get('/busiestDay', async (req, res) => {
  try {
    const busiestDay = await Summary.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$Date' } },
          totalLogins: { $sum: 1 }
        }
      },
      {
        $sort: { totalLogins: -1 }
      },
      {
        $limit: 1
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          totalLogins: 1
        }
      }
    ]);

    if (busiestDay.length > 0) {
      res.status(200).json(busiestDay[0]);
    } else {
      res.status(200).json({ date: null, totalLogins: 0 });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}); 

// API 1.F
router.get('/busiestHour', async (req, res) => {
  try {
    const busiestDay = await Summary.aggregate([
      {
        $group: {
          _id: { loginHour: '$Login Hour' },
          totalLogins: { $sum: 1 }
        }
      },
      {
        $sort: { totalLogins: -1 }
      },
      {
        $limit: 1
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          totalLogins: 1
        }
      }
    ]);

    if (busiestDay.length > 0) {
      res.status(200).json(busiestDay[0]);
    } else {
      res.status(200).json({ date: null, totalLogins: 0 });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}); 

// API 1.G
router.get('/totalData', async (req, res) => {
  try {
    const totalData = await Summary.countDocuments();

    res.json(totalData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;