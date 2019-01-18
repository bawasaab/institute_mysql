'use strict';
var dated = new Date;
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Enquiries', [{
      firstName: "shilpa",
      lastName: "raghav",
      fatherName: "Suresh Raghav",
      enqDate: "2018-11-20",
      courseId: "3",
      remarks: "ok",
      status: "OPEN",
      createdAt: dated,
      updatedAt: dated
    },
    {
      firstName: "surbhi",
      lastName: "Negi",
      fatherName: "Shivam Negi",
      enqDate: "2018-11-20",
      courseId: "4",
      remarks: "average",
      status: "CLOSE",
      createdAt: dated,
      updatedAt: dated
    }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Enquiries', null, {});

  }
};


