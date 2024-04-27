export function checkWeightAndHeight(age, gender, ratio) {
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