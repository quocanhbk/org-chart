const data = [
    {
        id: 'bod',
        data: {
            name: "Board of Director",
            head: "tin.nguyen@ttgvn.com",
            staffs: ["thuan.pv@ttgvn.com", "nhan.dtm@ttgvn.com"]
        },
        parentId: null
    },
    {
        id: 'it',
        data: {
            name: "Information Technology",
            head: "thuan.pv@ttgvn.com",
            staffs: ["tan.nh@ttgvn.com", "thuy.ct@ttgvn.com", "tuananh@ttgvn.com"]
        },
        parentId: 'bod'
    },
    {
        id: 'app',
        data: {
            name: "Application",
            head: "tan.nh@ttgvn.com",
            staffs: ["anh.lq@ttgvn.com", "vu.lh@ttgvn.com", "thao.tt@ttgvn.com", "son.nk@ttgvn.com", "dat.nq@ttgvn.com", "thuan.vt@ttgvn.com"]
        },
        parentId: 'it'
    },
    {
        id: 'erp',
        data: {
            name: "ERP",
            head: "thuy.ct@ttgvn.com",
            staffs: ["cuc.ctt@ttgvn.com", "nam.pt@ttgvn.com"]
        },
        parentId: 'it'
    },
    {
        id: 'infra',
        data: {
            name: "Infrastructure",
            head: "tuananh@ttgvn.com",
            staffs: ["hoai.nd@ttgvn.com", "do.nh@ttgvn.com", "lan.stl@ttgvn.com"]
        },
        parentId: 'it'
    },
]

export const peopleData = [
    {name: "La Quoc Anh",       jobTitle: "Staff",              email: "anh.lq@ttgvn.com"},
    {name: "Nguyen Hoang Tan",  jobTitle: "Executive",          email: "tan.nh@ttgvn.com"}, 
    {name: "Le Hoang Vu",       jobTitle: "Executive",          email: "vu.lh@ttgvn.com"},
    {name: "Tran Thach Thao",   jobTitle: "Staff",              email: "thao.tt@ttgvn.com"},
    {name: "Van Thuan Quan",    jobTitle: "Staff",              email: "quan.vt@ttgvn.com"},
    {name: "Nguyen Quoc Dat",   jobTitle: "Staff",              email: "dat.nq@ttgvn.com"},
    {name: "Ngo Kim Son",       jobTitle: "Staff",              email: "son.nk@ttgvn.com"},
    {name: "Cao Thi Thuy",      jobTitle: "Executive",          email: "thuy.ct@ttgvn.com"},
    {name: "Vu Thi Le Thi",     jobTitle: "Staff",              email: "thi.vtl@ttgvn.com"},
    {name: "Nguyen Trung Tin",  jobTitle: "CEO",                email: "tin.nguyen@ttgvn.com"},
    {name: "Pham Van Thuan",    jobTitle: "Deputy Director",    email: "thuan.pv@ttgvn.com"},
    {name: "Cao Thi Thuy Cuc",  jobTitle: "Staff",              email: "cuc.ctt@ttgvn.com"},
    {name: "Phi Thien Nam",     jobTitle: "Staff",              email: "nam.pt@ttgvn.com"},
    {name: "Nguyen Tuan Anh",   jobTitle: "Deputy Manager",     email: "tuananh@ttgvn.com"},
    {name: "Nguyen Duc Hoai",   jobTitle: "Executive",          email: "hoai.nd@ttgvn.com"},
    {name: "Nguyen Huu Do",     jobTitle: "Executive",          email: "do.nh@ttgvn.com"},
    {name: "Sam Thi Lan Anh",   jobTitle: "Executive",          email: "anh.stl@ttgvn.com"},
]

export default data