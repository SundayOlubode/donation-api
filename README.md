# Donation App
A web app that tracks the donation of a certain group of people.
---

## Setup
---
- Install NodeJS, mongodb
- Pull this repo
- Run `npm install`
- Run `npm run start`

## Models
---

### Donor
| field     | datatype | constraints      |
| --------- | -------- | ---------------- |
| email     | string   | required, unique |
| firstname | string   | required         |
| lastname  | string   | required         |
| password  | string   | required         |
| donation  | array of mongoose ObjectId  | ref: 'donation'  |


### Admin
| field       | datatype                | constraints                 |
| ----------- | ----------------------- | --------------------------- |
| email       | string                  | required , unique           |
| password    | string                  | required                    |
| firstname   | string                  | required                    |
| lastname    | string                  | required                    |

### Donation
| field       | datatype                | constraints                 |
| ----------- | ----------------------- | --------------------------- |
| amount      | number                  | required , unique           |
| date        | date                    | optional                    |
| donor       | mongoose.Types.ObjectId | ref: 'donor'                |
| verified    | boolean                 | default: false              |


## Owner
- Olubode Sunday Samuel