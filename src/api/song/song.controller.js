import { songService } from './song.service.js'
export const songController = {
    addSong,
    removeSong
}

// CREATE
async function addSong(req, res) {
    try {
        const newSong = await songService.add(req.body)
        res.status(200).send(newSong)
    } catch (err) {
        console.error(err.message)
        res.status(400).send(err)
    }
}

// DELETE
async function removeSong(req, res) {
    try {
        await songService.remove(req.params)
        res.status(200).send()

    } catch (err) {
        console.error(err.message)
        res.status(400).send(err)

    }
}


