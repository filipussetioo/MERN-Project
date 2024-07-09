import express from "express";
import { Summary } from "../models/sumModel.js";

const router = express.Router();

// API 3.A
router.get('/detail/:email', async (req, res) => {
   try {
        const email = req.params.email;
        const detail = await Summary.aggregate([
        {
            $match: {
                Email: email
            }
        },
        {
            $group: {
                _id: {
                    email: '$Email'
                },
                userData: {
                    $first: {
                        Name: '$Name',
                        Age: '$Age',
                        gender: '$gender',
                        Email: '$Email',
                        NoTelp: '$No Telp',
                        BrandDevice: '$Brand Device',
                        DigitalInterest: '$Digital Interest',
                        LocationType: '$Location Type'
                    }
                }
            }
        },
        {
            $project: {
              _id: 0,
              userDetail: '$userData'
            }
        }
        
       ])
       res.send(detail);
   } catch (error) {
       res.status(500).send({ error: error.message });
   }
});

// API 3.B
router.get('/top5Users', async (req, res) => {
    try {
      const topUsersPerLocation = await Summary.aggregate([
        {
          $group: {
            _id: {
              email: '$Email',
              location: '$Name of Location'
            },
            userData: {
              $first: {
                Name: '$Name',
                Email: '$Email',
                NoTelp: '$No Telp',
              }
            },
            visitCount: { $sum: 1 }
          }
        },
        {
          $sort: {
            '_id.location': 1,
            visitCount: -1
          }
        },
        {
          $group: {
            _id: '$_id.location',
            users: {
              $push: {
                userData: '$userData',
                visitCount: '$visitCount'
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            location: '$_id',
            top5Users: {
              $slice: ['$users', 5]
            }
          }
        }
      ]);
  
      res.json(topUsersPerLocation);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
});

export default router;