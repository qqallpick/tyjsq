function checkYinti(age, gender, yinti) {
    if (gender == 'male') {
        if (16 <= age && age <= 24) {
            if (10 <= yinti && yinti < 11) return 55
            else if (11 <= yinti && yinti < 12) return 60
            else if (12 <= yinti && yinti < 14) return 65
            else if (14 <= yinti && yinti < 15) return 70
            else if (15 <= yinti && yinti < 18) return 75
            else if (30 <= yinti) return 100 + yinti - 30
            else return 0
        } else if (25 <= age && age <= 27) {
            if (9 <= yinti && yinti < 10) return 55
            else if (10 <= yinti && yinti < 11) return 60
            else if (11 <= yinti && yinti < 13) return 65
            else if (13 <= yinti && yinti < 14) return 70
            else if (14 <= yinti && yinti < 16) return 75
            else if (28 <= yinti) return 100 + yinti - 28
            else return 0
        }
    }
    else if (gender == 'female') {

        if (40 <= age && age <= 42) {
            if (yinti == 27) return 55
            else if (yinti == 28) return 60
            else if (29 <= yinti && yinti <= 33) return 65
            else if (34 <= yinti && yinti <= 38) return 70
            else if (56 <= yinti && yinti <= 72) return 95
            else if (73 <= yinti) return parseInt(100 + (yinti - 73) / 2)
            else return 0
        } else if (43 <= age && age <= 45) {
            if (yinti == 26) return 55
            else if (yinti == 27) return 60
            else if (28 <= yinti && yinti <= 30) return 65
            else if (31 <= yinti && yinti <= 36) return 70
            else if (62 <= yinti && yinti <= 68) return 95
            else if (69 <= yinti) return parseInt(100 + (yinti - 69) / 2)
            else return 0
        }
    }
}