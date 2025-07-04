const valvulas = {
    "3 Vías": {
        "Asiento Roscadas": [
            { modelo: "VXP45.10-1", kvs: 1, },
            { modelo: "VXP45.10-1.6", kvs: 1.6, },
            { modelo: "VXP45.15-2.5", kvs: 2.5, },
            { modelo: "VXP45.20-4", kvs: 4, },
            { modelo: "VXP45.25-6.3", kvs: 6.3, },
            { modelo: "VXP45.25-10", kvs: 10, },
            { modelo: "VXP45.32-16", kvs: 16, },
            { modelo: "VXP45.40-25", kvs: 25, },
        ],
        "Asiento Bridas": [
            { modelo: "VXF32.15-4", kvs: 4, },
            { modelo: "VXF32.25-6.3", kvs: 6.3, },
            { modelo: "VXF32.25-10", kvs: 10, },
            { modelo: "VXF32.40-16", kvs: 16, },
            { modelo: "VXF32.40-25", kvs: 25, },
            { modelo: "VXF32.50-40", kvs: 40, },
            { modelo: "VXF32.65-63", kvs: 63, },
            { modelo: "VXF32.80-100", kvs: 100, },
            { modelo: "VXF32.100-160", kvs: 160, },
            { modelo: "VXF32.125-250", kvs: 250, },
            { modelo: "VXF32.150-400", kvs: 400, }
        ],
        "Sector": [
            { modelo: "VBF21.40-25", kvs: 25, },
            { modelo: "VBF21.50-40", kvs: 40, },
            { modelo: "VBF21.65-63", kvs: 63, },
            { modelo: "VBF21.80-100", kvs: 100, },
            { modelo: "VBF21.100-160", kvs: 160, },
            { modelo: "VBF21.125-550", kvs: 550, },
            { modelo: "VBF21.150-820", kvs: 820, }
        ],
        "ACS": [
            { modelo: "VXG41.15-4", kvs: 4, },
            { modelo: "VXG41.20-6.3", kvs: 6.3, },
            { modelo: "VXG41.25-10", kvs: 10, },
            { modelo: "VXG41.32-16", kvs: 16, },
            { modelo: "VXG41.40-25", kvs: 25, },
            { modelo: "VXG41.50-40", kvs: 40, }
        ],
        "Bola": [
            { modelo: "VBI61.15-4", kvs: 4, },
            { modelo: "VBI61.20-6.3", kvs: 6.3, },
            { modelo: "VBI61.25-10", kvs: 10, },
            { modelo: "VBI61.32-16", kvs: 16, },
            { modelo: "VBI61.40-25", kvs: 25, },
            { modelo: "VBI61.50-40", kvs: 40, }
        ],
    },
    "2 Vías": {
        "Asiento Roscadas": [
            { modelo: "VVP45.10-1", kvs: 1, },
            { modelo: "VVP45.10-1.6", kvs: 1.6, },
            { modelo: "VVP45.15-2.5", kvs: 2.5, },
            { modelo: "VVP45.20-4", kvs: 4, },
            { modelo: "VVP45.25-6.3", kvs: 6.3, },
            { modelo: "VVP45.25-10", kvs: 10, },
            { modelo: "VVP45.32-16", kvs: 16, },
            { modelo: "VVP45.40-25", kvs: 25, },
        ],
        "Asiento Bridas": [
            { modelo: "VVF32.15-4", kvs: 4, },
            { modelo: "VVF32.25-6.3", kvs: 6.3, },
            { modelo: "VVF32.25-10", kvs: 10, },
            { modelo: "VVF32.40-16", kvs: 16, },
            { modelo: "VVF32.40-25", kvs: 25, },
            { modelo: "VVF32.50-40", kvs: 40, },
            { modelo: "VVF32.65-63", kvs: 63, },
            { modelo: "VVF32.80-100", kvs: 100, },
            { modelo: "VVF32.100-160", kvs: 160, },
            { modelo: "VVF32.125-250", kvs: 250, },
            { modelo: "VVF32.150-400", kvs: 400, }
        ],
        "ACS": [
            { modelo: "VVG41.15-4", kvs: 4, },
            { modelo: "VVG41.20-6.3", kvs: 6.3, },
            { modelo: "VVG41.25-10", kvs: 10, },
            { modelo: "VVG41.32-16", kvs: 16, },
            { modelo: "VVG41.40-25", kvs: 25, },
            { modelo: "VVG41.50-40", kvs: 40, }
        ],
        "Bola": [
            { modelo: "VAI61.15-4", kvs: 4, },
            { modelo: "VAI61.20-6.3", kvs: 6.3, },
            { modelo: "VAI61.25-10", kvs: 10, },
            { modelo: "VAI61.32-16", kvs: 16, },
            { modelo: "VAI61.40-25", kvs: 25, },
            { modelo: "VAI61.50-40", kvs: 40, }
        ],
        // No sector para 2 vías
    },
};

const hit = "https://hit.sbt.siemens.com/RWD/app.aspx?MODULE=Catalog&ACTION=ShowProduct&KEY=BPZ%3a";