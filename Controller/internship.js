const Internship = require("../Model/Internship");
const no_of_internship_per_page = 20;

exports.postInternship = async (req, res, next) => {
    console.log(req.body);
    const { title, company_name, location, start_date, expiry_date, skills, About, no_of_opening } = req.body;
    try {
        let internship = new Internship({ title, company_name, location, start_date, expiry_date, skills, About, no_of_opening, postedBy: req.userId, user: req.userId });
        internship = await internship.save()
        return res.status(201).json({
            msg: "Internship Posted Successfully",
            id: internship._id,
        })
    }
    catch (err) {
        return next(err);
    }
}

exports.getallInternships = async (req, res, next) => {
    console.log("requested for Internships");
    const page = req.query.page | 1;
    const internship = await Internship.find({ expiry_date: { '$gt': Date.now() } }).populate('postedBy').skip(no_of_internship_per_page * (page - 1)).limit(no_of_internship_per_page);
    console.log(internship);
    return res.status(200).json({ message: "Fetched Successfully", internship })
}

exports.updateInternship = async (req, res, next) => {
    const id = req.params.id;
    const { title, company_name, location, start_date, expiry_date, skills, About, no_of_opening } = req.body;
    console.log(title, company_name, location, start_date, expiry_date, skills, About, no_of_opening);
    try {
        const intern = await Internship.findById(id);
        if (!intern) {
            const error = new Error("Internship Not Found")
            error.code = 404;
            throw error;
        }

        if (req.userId.toString() !== intern.postedBy._id.toString()) {
            const error = new Error("Not authorized")
            error.code = 403;
            throw error;
        }


        intern.title = title;
        intern.company_name = company_name;
        intern.location = location;
        intern.start_date = start_date;
        intern.expiry_date = expiry_date;
        intern.skills = skills;
        intern.About = About;
        intern.no_of_opening = no_of_opening;

        const i = await intern.save();
        console.log(i);

        res.status(201).json({ message: "Updated Succesfully", internship: i })
    } catch (err) {
        return next(err);
    }
}


exports.removeInternShip = async (req, res, next) => {
    const id = req.params.id;

    try {
        const intern = await Internship.findById(id);
        if (!intern) {
            const error = new Error("Internship Not Found")
            error.code = 404;
            throw error;
        }
        if (intern.postedBy._id.toString() !== req.userId.toString()) {
            const error = new Error("Unauthorized access")
            error.code = 403;
            throw error;
        }

        const result = await Internship.findByIdAndDelete(id)
        res.status(200).json({ message: "Deleted!!", result })

    } catch (err) {
        next(err)
    }
}