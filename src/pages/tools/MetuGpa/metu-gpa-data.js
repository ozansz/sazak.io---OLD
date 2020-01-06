module.exports = {
    courses: {
        PHYS106: {
            name: "GENERAL PHYSICS II",
            credit: 4
        },
        MATH120: {
            name: "CALCULUS OF FUNCTIONS OF SEVERAL VARIABLES",
            credit: 5
        },
        MATH260: {
            name: "BASIC LINEAR ALGEBRA",
            credit: 3
        },
        CENG140: {
            name: "C PROGRAMMING",
            credit: 3
        },
        ENG102: {
            name: "ENGLISH FOR ACADEMIC PURPOSES II",
            credit: 4
        }
    },
    depts: {
        ceng: {
            courses: ["PHYS106", "MATH120", "MATH260", "CENG140", "ENG102"],
            short_name: "CENG",
            name: "Computer Engineeering",
            id: "ceng"
        }
  }
}