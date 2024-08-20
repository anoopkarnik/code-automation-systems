'use server'

import { queryNotionPageAction } from "../../../../actions/notion/notion"

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


export const fetchDetailsOfPages = async (apiToken:any, ids:any) => {
    let pages:any[] = []
    for (let page of ids) {
        const data = await queryNotionPageAction({ apiToken, pageId: page });
        pages.push(data);
    }
    return pages
}
export const fetchDetailsOfPagesWithSummary = async (apiToken: any, ids: any, data:any) => {
    let pages;
    if (!data) {
        pages = await fetchDetailsOfPages(apiToken, ids);
    }
    else {
        pages = data;
    }
    const newTestGrades: any = {};
    const revisionTimeTaken:any = {};
    let totalLines = 0;
    let totalTestPercentage = 0;
    let totalDifficulty = 0;
    let totalSelfGrade = 0;
    let notesToReview = 0;
    let totalTestsTaken = 0;
    let totalTimeTakenToReviseAllNotes = 0;
    let totalTimeTakenToReviseNotesToReview = 0;
    for (let page of pages) {
        const testGradesList = page['Test Grades'].trim() === "" 
        ? [] 
        : page['Test Grades'].split(",").map((item: string) => parseInt(item.trim(), 10));
        totalLines += parseInt(page['Total Line Count'].match(/\d+/)[0]);
        totalTestPercentage += testGradesList.length==0 ? 0 : testGradesList.reduce((acc:number,current:number)=>acc+current,0)/testGradesList.length;
        totalDifficulty += parseInt(page['Difficulty']);
        totalSelfGrade += parseInt(page['Self Grade']);
        let reviewDate = new Date(page['Review Date']);
        let timeTakenToRevise = await calculateRevisionTime(page['Self Grade'], page['Difficulty'], parseInt(page['Total Line Count'].match(/\d+/)[0]));
        totalTimeTakenToReviseAllNotes+= timeTakenToRevise;
        let today = new Date();
        if (reviewDate < today){
            notesToReview += 1;
            totalTimeTakenToReviseNotesToReview+= timeTakenToRevise;
        }
        totalTestsTaken += testGradesList.length;
        newTestGrades[page] = testGradesList;
        revisionTimeTaken[page] = timeTakenToRevise;
    }
    let averageTestPercentage = totalTestPercentage/pages.length;
    let averageDifficulty = totalDifficulty/pages.length;
    let averageSelfGrade = totalSelfGrade/pages.length;

    return {pages, newTestGrades, totalLines, averageTestPercentage, averageDifficulty, averageSelfGrade, notesToReview,
        totalTestsTaken, totalTimeTakenToReviseAllNotes, totalTimeTakenToReviseNotesToReview, revisionTimeTaken}
}

export const difficultyToName = async (difficulty: any) => {
    if (difficulty <=1) return "Easy Peasy";
    if (difficulty <=2) return "Beginner Friendly";
    if (difficulty <=3) return "Challenging";
    if (difficulty <=4) return "Hardcore";
    if (difficulty <5) return "Nightmarish";
    return "Near Impossible ";
}

export const selfGradeToName = async (selfGrade: any) => {
    if (selfGrade < 5) {
        return "F Rank - 404 Not Found";
    } else if (selfGrade >= 9.9) {
        return "SSS Rank - God Tier";
    } else if (selfGrade >= 9.5) {
        return "S Rank - Master";
    } else if (selfGrade >= 9) {
        return "A Rank - Veteran";
    } else if (selfGrade >= 8) {
        return "B Rank - Professional";
    } else if (selfGrade >= 7) {
        return "C Rank - Operational";
    } else if (selfGrade >= 6) {
        return "D Rank - Under Development";
    } else if (selfGrade >= 5) {
        return "E Rank - Noob";
    } else {
        return "F Rank - 404 Not Found";
    }
}

export const calculateRevisionTime = async (selfGrade:any, difficulty:any, totalLines:any) => {
    const baseTimePerLine = 0.5;
    const difficultyMultiplier = Math.pow(difficulty,1.5);
    const selfGradeMultiplier = Math.exp(-(selfGrade/10));
    const time = totalLines * baseTimePerLine * difficultyMultiplier * selfGradeMultiplier;
    return time;
}