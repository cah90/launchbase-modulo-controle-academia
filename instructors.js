const fs = require('fs')
const data = require('./data.json')

//show
exports.show = function(req, res) {
  const { id } = req.params

  const findInstructor = data.instructors.find(function(instructor) {
    return id == instructor.id
  })

  if (!findInstructor) return res.send('Instructor not found!')

  return res.send(findInstructor)
}

// create
exports.post = function(req, res) {

    const keys = Object.keys(req.body)
  
    for(key of keys) {
      if(req.body[key] === "")
        return res.send('Please, fill all the form.')
    }

    let { avatar_url, birth, name, services, gender } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)

    data.instructors.push({
      id,
      avatar_url,
      name,
      birth,
      gender,
      services,
      created_at,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
      if(err) return res.send("Write file error")
  
      return res.redirect("/instructors")
    })
  
  
    // return res.send(req.body)
  }

  