'use server'
export const calculateTotalLength = async (skillTree:any, skillTrees:any) => {
    let totalNotes = skillTree["Self"]
    let totalAttachments = skillTree["Others"]
    let totalVideos = skillTree["Videos"]
    let totalProjects = skillTree["Projects"]
    let children = skillTree["Sub-tasks"]
    while (children.length > 0) {
        const childId = children.pop()
        const child = skillTrees.find((item:any) => item.id === childId)
        totalNotes.push(...child["Self"])
        totalAttachments.push(...child["Others"])
        totalVideos.push(...child["Videos"])
        totalProjects.push(...child["Projects"])
        children.push(...child["Sub-tasks"])
    }
    return {totalNotes, totalAttachments, totalVideos, totalProjects}
}

export const calculateTotalLengthPerType = async (skillTrees:any, skillTreeItems:any) => {
    let notes:any = []
    let attachments:any = []
    let videos:any = []
    for (let skillTree of skillTrees){
        const {totalNotes, totalAttachments, totalVideos, totalProjects: projects} = await calculateTotalLength(skillTree, skillTreeItems)
        notes.push(...totalNotes)
        attachments.push(...totalAttachments)
        videos.push(...totalVideos)
    }
    return {notes, attachments, videos}
}