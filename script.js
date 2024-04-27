document.getElementById('heightWeightForm').addEventListener('submit', function (event) {
    event.preventDefault(); // 阻止表单默认提交行为  
    const gender = document.getElementById('gender').value;
    if (gender != 'male' && gender != 'female') {
        alert('请选择性别');
        return;
    }
    const age = parseInt(document.getElementById('age').value);
    if (age < 16 || age > 60) {
        alert('年龄在16-60之间');
        return;
    }
    if (age >= 40 && gender == 'male') {
        const yinti = document.getElementById('yintilabel');
        yinti.textContent = `俯卧撑 (个):`
    } else if (age >= 40 && gender == 'female') {
        const yinti = document.getElementById('yintilabel');
        yinti.textContent = `俯卧撑 (个):`
    } else if (age < 40 && gender == 'female') {
        const yinti = document.getElementById('yintilabel');
        yinti.textContent = `屈臂悬垂 (秒):`
    }
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    if (height && weight) {
        const ratio = weight / ((height / 100) ** 2);
        const resultElement = document.getElementById('result');
        const result = checkWeightAndHeight(age, gender, ratio);
        resultElement.textContent = `体重身高比为:${ratio.toFixed(2)} - ${result}`;
    } else {
        alert('请输入身高和体重');
        return;
    }

});

document.getElementById('tinengForm').addEventListener('submit', function (event) {
    event.preventDefault(); // 阻止表单默认提交行为  
    const gender = document.getElementById('gender').value;
    if (gender != 'male' && gender != 'female') {
        alert('请选择性别');
        return;
    }
    const age = document.getElementById('age').value;
    if (age < 16 || age > 60) {
        alert('年龄在16-60之间');
        return;
    }

    const yinti = parseInt(document.getElementById('yinti').value);
    const yangwo = parseInt(document.getElementById('yangwo').value);
    const shexing = parseInt(document.getElementById('shexing').value);
    const sanqianfen = parseInt(document.getElementById('weightMinutes').value);
    const sanqianmiao = parseInt(document.getElementById('weightSeconds').value);
    if (yinti && yangwo && shexing && sanqianfen && sanqianmiao) {
        const yintiresult = checkYinti(age, gender, yinti)
        const yintiresultElement = document.getElementById('yintiresult');
        yintiresultElement.textContent = `${yintiresult}`;

        const yangworesult = checkYangwo(age, gender, yangwo)
        const yangworesultElement = document.getElementById('yangworesult');
        yangworesultElement.textContent = `${yangworesult}`;

        const shexingresult = checkShexing(age, gender, shexing)
        const shexingresultElement = document.getElementById('shexingresult');
        shexingresultElement.textContent = `${shexingresult}`;

        const sanqianresult = checkSanqian(age, gender, sanqianfen, sanqianmiao)
        const sanqianresultElement = document.getElementById('sanqianresult');
        sanqianresultElement.textContent = `${sanqianresult}`;

        const scoreElement = document.getElementById('scoreresult');
        const score = yintiresult + yangworesult + shexingresult + sanqianresult
        scoreElement.textContent = `${score}`;

        const ratingElement = document.getElementById('ratingresult');
        if (score < 240) ratingElement.textContent = `不及格`;
        else if (240 <= score && score < 320) ratingElement.textContent = `及格`;
        else if (320 <= score && score < 360) ratingElement.textContent = `良好`;
        else if (360 <= score) ratingElement.textContent = `优秀`;
    } else {
        alert('请输入完整数据，包括年龄和性别');
        return;
    }
});

function checkWeightAndHeight(age, gender, ratio) {
    // 验证参数  
    if (typeof age !== 'number' || isNaN(age) || age < 0) {
        throw new Error('Invalid age');
    }
    if (typeof ratio !== 'number' || isNaN(ratio) || ratio < 0) {
        throw new Error('Invalid ratio');
    }
    if (gender !== 'male' && gender !== 'female') {
        throw new Error('Invalid gender');
    }

    // 定义BMI的界限  
    const bmiLimits = {
        male: [
            { minAge: 16, maxAge: 24, minRatio: 18.5, maxRatio: 25.9 },
            { minAge: 25, maxAge: 29, minRatio: 18.5, maxRatio: 26.9 },
            { minAge: 30, maxAge: 39, minRatio: 18.5, maxRatio: 27.9 },
            { minAge: 40, maxAge: 49, minRatio: 18.5, maxRatio: 28.9 },
            { minAge: 50, maxAge: 59, minRatio: 18.5, maxRatio: 29.4 },
            { minAge: 60, maxAge: 99, minRatio: 18.5, maxRatio: 29.9 }
            
        ],
        female: [
            { minAge: 16, maxAge: 24, minRatio: 18.5, maxRatio: 23.9 },
            { minAge: 25, maxAge: 29, minRatio: 18.5, maxRatio: 24.9 },
            { minAge: 30, maxAge: 39, minRatio: 18.5, maxRatio: 25.9 },
            { minAge: 40, maxAge: 49, minRatio: 18.5, maxRatio: 26.9 },
            { minAge: 50, maxAge: 59, minRatio: 18.5, maxRatio: 27.4 },
            { minAge: 60, maxAge: 99, minRatio: 18.5, maxRatio: 27.9 }
        ]
    };

    // 根据性别获取BMI的界限  
    const limits = bmiLimits[gender];
    if (!limits) {
        throw new Error('Invalid gender');
    }

    // 检查BMI是否在合适的范围内  
    for (const limit of limits) {
        if (age >= limit.minAge && age <= limit.maxAge && ratio >= limit.minRatio && ratio <= limit.maxRatio) {
            return '合格';
        }
    }

    return '不合格';
}

function checkYinti(age, gender, yinti) {
    if (gender == 'male') {
        if (16 <= age && age <= 24) {
            if (10 <= yinti && yinti < 11) return 55
            else if (11 <= yinti && yinti < 12) return 60
            else if (12 <= yinti && yinti < 14) return 65
            else if (14 <= yinti && yinti < 15) return 70
            else if (15 <= yinti && yinti < 18) return 75
            else if (18 <= yinti && yinti < 21) return 80
            else if (21 <= yinti && yinti < 24) return 85
            else if (24 <= yinti && yinti < 27) return 90
            else if (27 <= yinti && yinti < 30) return 95
            else if (30 <= yinti) return 100 + yinti - 30
            else return 0
        } else if (25 <= age && age <= 27) {
            if (9 <= yinti && yinti < 10) return 55
            else if (10 <= yinti && yinti < 11) return 60
            else if (11 <= yinti && yinti < 13) return 65
            else if (13 <= yinti && yinti < 14) return 70
            else if (14 <= yinti && yinti < 16) return 75
            else if (16 <= yinti && yinti < 19) return 80
            else if (19 <= yinti && yinti < 22) return 85
            else if (22 <= yinti && yinti < 25) return 90
            else if (25 <= yinti && yinti < 28) return 95
            else if (28 <= yinti) return 100 + yinti - 28
            else return 0
        } else if (28 <= age && age <= 30) {
            if (8 <= yinti && yinti < 9) return 55
            else if (9 <= yinti && yinti < 10) return 60
            else if (10 <= yinti && yinti < 11) return 65
            else if (11 <= yinti && yinti < 12) return 70
            else if (12 <= yinti && yinti < 14) return 75
            else if (14 <= yinti && yinti < 17) return 80
            else if (17 <= yinti && yinti < 20) return 85
            else if (20 <= yinti && yinti < 23) return 90
            else if (23 <= yinti && yinti < 26) return 95
            else if (26 <= yinti) return 100 + yinti - 26
            else return 0
        } else if (31 <= age && age <= 33) {
            if (7 <= yinti && yinti < 8) return 55
            else if (8 <= yinti && yinti < 9) return 60
            else if (9 <= yinti && yinti < 10) return 65
            else if (10 <= yinti && yinti < 11) return 70
            else if (11 <= yinti && yinti < 13) return 75
            else if (13 <= yinti && yinti < 15) return 80
            else if (15 <= yinti && yinti < 17) return 85
            else if (17 <= yinti && yinti < 20) return 90
            else if (20 <= yinti && yinti < 23) return 95
            else if (23 <= yinti) return 100 + yinti - 23
            else return 0
        } else if (34 <= age && age <= 36) {
            if (6 <= yinti && yinti < 7) return 55
            else if (7 <= yinti && yinti < 8) return 60
            else if (8 <= yinti && yinti < 9) return 65
            else if (9 <= yinti && yinti < 10) return 70
            else if (10 <= yinti && yinti < 11) return 75
            else if (11 <= yinti && yinti < 12) return 80
            else if (12 <= yinti && yinti < 14) return 85
            else if (14 <= yinti && yinti < 17) return 90
            else if (17 <= yinti && yinti < 20) return 95
            else if (20 <= yinti) return 100 + yinti - 20
            else return 0
        } else if (37 <= age && age <= 39) {
            if (5 <= yinti && yinti < 6) return 55
            else if (6 <= yinti && yinti < 7) return 60
            else if (7 <= yinti && yinti < 8) return 65
            else if (8 <= yinti && yinti < 9) return 70
            else if (9 <= yinti && yinti < 10) return 75
            else if (10 <= yinti && yinti < 11) return 80
            else if (11 <= yinti && yinti < 13) return 85
            else if (13 <= yinti && yinti < 15) return 90
            else if (15 <= yinti && yinti < 17) return 95
            else if (17 <= yinti) return 100 + yinti - 17
            else return 0
        }
        // 大于40岁男性，使用俯卧撑
        else if (40 <= age && age <= 42) {
            if (yinti == 27) return 55
            else if (yinti == 28) return 60
            else if (29 <= yinti && yinti <= 33) return 65
            else if (34 <= yinti && yinti <= 38) return 70
            else if (39 <= yinti && yinti <= 44) return 75
            else if (45 <= yinti && yinti <= 50) return 80
            else if (51 <= yinti && yinti <= 56) return 85
            else if (57 <= yinti && yinti <= 64) return 90
            else if (56 <= yinti && yinti <= 72) return 95
            else if (73 <= yinti) return parseInt(100 + (yinti - 73) / 2)
            else return 0
        } else if (43 <= age && age <= 45) {
            if (yinti == 26) return 55
            else if (yinti == 27) return 60
            else if (28 <= yinti && yinti <= 30) return 65
            else if (31 <= yinti && yinti <= 36) return 70
            else if (37 <= yinti && yinti <= 42) return 75
            else if (43 <= yinti && yinti <= 48) return 80
            else if (49 <= yinti && yinti <= 54) return 85
            else if (55 <= yinti && yinti <= 61) return 90
            else if (62 <= yinti && yinti <= 68) return 95
            else if (69 <= yinti) return parseInt(100 + (yinti - 69) / 2)
            else return 0
        } else if (46 <= age && age <= 48) {
            if (yinti == 23) return 55
            else if (yinti == 24) return 60
            else if (25 <= yinti && yinti <= 29) return 65
            else if (30 <= yinti && yinti <= 35) return 70
            else if (36 <= yinti && yinti <= 41) return 75
            else if (42 <= yinti && yinti <= 47) return 80
            else if (48 <= yinti && yinti <= 53) return 85
            else if (54 <= yinti && yinti <= 60) return 90
            else if (61 <= yinti && yinti <= 67) return 95
            else if (68 <= yinti) return parseInt(100 + (yinti - 68) / 2)
            else return 0
        }// 待完善
    }
    else if (gender == 'female') {
        // 待完善
    } else return 0
}

function checkYangwo(age, gender, yangwo) {
    if (gender == 'male') {
        if (16 <= age && age <= 24) {
            if (46 <= yangwo && yangwo < 50) return 55
            else if (50 <= yangwo && yangwo < 54) return 60
            else if (54 <= yangwo && yangwo < 58) return 65
            else if (58 <= yangwo && yangwo < 62) return 70
            else if (62 <= yangwo && yangwo < 67) return 75
            else if (67 <= yangwo && yangwo < 72) return 80
            else if (72 <= yangwo && yangwo < 77) return 85
            else if (77 <= yangwo && yangwo < 82) return 90
            else if (82 <= yangwo && yangwo < 87) return 95
            else if (87 <= yangwo) return parseInt(100 + (yangwo - 87) / 2)
            else return 0
        } else if (25 <= age && age <= 27) {
            if (43 <= yangwo && yangwo < 47) return 55
            else if (47 <= yangwo && yangwo < 51) return 60
            else if (51 <= yangwo && yangwo < 55) return 65
            else if (55 <= yangwo && yangwo < 59) return 70
            else if (59 <= yangwo && yangwo < 63) return 75
            else if (63 <= yangwo && yangwo < 67) return 80
            else if (67 <= yangwo && yangwo < 72) return 85
            else if (72 <= yangwo && yangwo < 77) return 90
            else if (77 <= yangwo && yangwo < 82) return 95
            else if (82 <= yangwo) return parseInt(100 + (yangwo - 82) / 2)
            else return 0
        } else if (28 <= age && age <= 30) {
            if (41 <= yangwo && yangwo < 45) return 55
            else if (45 <= yangwo && yangwo < 49) return 60
            else if (49 <= yangwo && yangwo < 53) return 65
            else if (53 <= yangwo && yangwo < 57) return 70
            else if (57 <= yangwo && yangwo < 61) return 75
            else if (61 <= yangwo && yangwo < 65) return 80
            else if (65 <= yangwo && yangwo < 70) return 85
            else if (70 <= yangwo && yangwo < 75) return 90
            else if (75 <= yangwo && yangwo < 80) return 95
            else if (80 <= yangwo) return parseInt(100 + (yangwo - 80) / 2)
            else return 0
        } else if (31 <= age && age <= 33) {
            if (39 <= yangwo && yangwo < 43) return 55
            else if (43 <= yangwo && yangwo < 47) return 60
            else if (47 <= yangwo && yangwo < 51) return 65
            else if (51 <= yangwo && yangwo < 55) return 70
            else if (55 <= yangwo && yangwo < 59) return 75
            else if (59 <= yangwo && yangwo < 63) return 80
            else if (63 <= yangwo && yangwo < 68) return 85
            else if (68 <= yangwo && yangwo < 73) return 90
            else if (73 <= yangwo && yangwo < 78) return 95
            else if (78 <= yangwo) return parseInt(100 + (yangwo - 78) / 2)
            else return 0
        } else if (34 <= age && age <= 36) {
            if (35 <= yangwo && yangwo < 39) return 55
            else if (39 <= yangwo && yangwo < 43) return 60
            else if (43 <= yangwo && yangwo < 47) return 65
            else if (47 <= yangwo && yangwo < 51) return 70
            else if (51 <= yangwo && yangwo < 55) return 75
            else if (55 <= yangwo && yangwo < 60) return 80
            else if (60 <= yangwo && yangwo < 65) return 85
            else if (65 <= yangwo && yangwo < 70) return 90
            else if (70 <= yangwo && yangwo < 75) return 95
            else if (75 <= yangwo) return parseInt(100 + (yangwo - 75) / 2)
            else return 0
        }
    } else if (gender == 'female') {
        return 0
    }
    return 0
}

function checkShexing(age, gender, shexing) {
    return 0
}

function checkSanqian(age, gender, sanqianfen, sanqianmiao) {
    return 0
}