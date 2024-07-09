import express from "express";
import { Summary } from "../models/sumModel.js";

const router = express.Router();

// API 2.A
router.get('/agePercentage', async (req, res) => {
    try {
        const ageGroupPercentage = await Summary.aggregate([
            {
                $group: {
                _id: '$Email', // Group by Email to count each unique user only once
                YoB: { $first:'$Age' } // Calculate age based on current year and YearOfBirth
                }
            },
            {
                $addFields: {
                    age: {$subtract:[new Date().getFullYear(), '$YoB']}
                }
            },
            {
              $group: {
                _id: '$_id.email',
                countTotal: { $sum: 1 },
                countUnder18: { $sum: { $cond: [{ $lt: ['$age', 18] }, 1, 0] } },
                count18to24: { $sum: { $cond: [{ $and: [{ $gte: ['$age', 18] }, { $lte: ['$age', 24] }] }, 1, 0] } },
                count25to34: { $sum: { $cond: [{ $and: [{ $gte: ['$age', 25] }, { $lte: ['$age', 34] }] }, 1, 0] } },
                count35to44: { $sum: { $cond: [{ $and: [{ $gte: ['$age', 35] }, { $lte: ['$age', 44] }] }, 1, 0] } },
                count45to64: { $sum: { $cond: [{ $and: [{ $gte: ['$age', 45] }, { $lte: ['$age', 64] }] }, 1, 0] } },
                countOver64: { $sum: { $cond: [{ $gte: ['$age', 65] }, 1, 0] } }
              }
            },
            {
              $project: {
                _id: 0,
                ageGroups: {
                  under18: { $multiply: [{ $divide: ['$countUnder18', '$countTotal'] }, 100] },
                  '18-24': { $multiply: [{ $divide: ['$count18to24', '$countTotal'] }, 100] },
                  '25-34': { $multiply: [{ $divide: ['$count25to34', '$countTotal'] }, 100] },
                  '35-44': { $multiply: [{ $divide: ['$count35to44', '$countTotal'] }, 100] },
                  '45-64': { $multiply: [{ $divide: ['$count45to64', '$countTotal'] }, 100] },
                  over64: { $multiply: [{ $divide: ['$countOver64', '$countTotal'] }, 100] }
                }
              }
            }
          ]);
      
          res.json(ageGroupPercentage[0].ageGroups);
        } catch (err) {
          console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
});

// API 2.B
router.get('/genderPercentage', async (req, res) => {
    try {
        
        const genderPercentage = await Summary.aggregate([
        {
          $group: {
            _id: '$gender', // Group by gender
            uniqueUsers: { $addToSet: '$Email' } // Add each unique user's email to set
          }
        },
        {
          $group: {
            _id: null,
            totalUniqueUsers: { $sum: { $size: '$uniqueUsers' } }, // Count total unique users
            genderCounts: {
              $push: {
                gender: '$_id',
                count: { $size: '$uniqueUsers' } // Count unique users for each gender
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            genderPercentages: {
              $map: {
                input: '$genderCounts',
                as: 'gender',
                in: {
                  gender: '$$gender.gender',
                  percentage: { $multiply: [{ $divide: ['$$gender.count', '$totalUniqueUsers'] }, 100 ]}}
              }
            }
          }
        }
      ]);
  
      // Return the gender percentages
      res.json(genderPercentage.length > 0 ? genderPercentage[0].genderPercentages : []);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
});

// API 2.C
router.get('/phoneBrand', async (req, res) => {
    try {
        
        const phoneBrand = await Summary.aggregate([
        {
          $group: {
            _id: '$Brand Device', // Group by gender
            uniqueUsers: { $addToSet: '$Email' } // Add each unique user's email to set
          }
        },
        {
          $group: {
            _id: null,
            totalUniqueUsers: { $sum: { $size: '$uniqueUsers' } }, // Count total unique users
            genderCounts: {
              $push: {
                gender: '$_id',
                count: { $size: '$uniqueUsers' } // Count unique users for each gender
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            phoneBrands: {
              $map: {
                input: '$genderCounts',
                as: 'gender',
                in: {
                  brand: '$$gender.gender',
                  percentage: {
                    $multiply: [{ $divide: ['$$gender.count', '$totalUniqueUsers'] }, 100 ]}
                }
              }
            }
          }
        }
      ]);
  
      // Return the gender percentages
      res.json(phoneBrand.length > 0 ? phoneBrand[0].phoneBrands : []);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
});

// API 2.D
router.get('/digitalInterest', async (req, res) => {
    try {
        
        const digitalInterest = await Summary.aggregate([
        {
          $group: {
            _id: '$Digital Interest', // Group by gender
            uniqueUsers: { $addToSet: '$Email' } // Add each unique user's email to set
          }
        },
        {
          $group: {
            _id: null,
            totalUniqueUsers: { $sum: { $size: '$uniqueUsers' } }, // Count total unique users
            genderCounts: {
              $push: {
                gender: '$_id',
                count: { $size: '$uniqueUsers' } // Count unique users for each gender
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            digitalInterest: {
              $map: {
                input: '$genderCounts',
                as: 'gender',
                in: {
                  interest: '$$gender.gender',
                  percentage: {
                    $multiply: [{ $divide: ['$$gender.count', '$totalUniqueUsers'] }, 100 ]}
                }
              }
            }
          }
        }
      ]);
  
      // Return the gender percentages
      res.json(digitalInterest.length > 0 ? digitalInterest[0].digitalInterest : []);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
});

export default router;