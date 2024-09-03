import { queryAllNotionDatabaseAction } from "./notion";

export const getInterestingDatabaseSummary = async ({apiToken, database_id}:any) => {
    let filters: any = [
        {name:'Done',type: 'checkbox', condition: 'equals', value: false}
    ]
    let sorts: any = [
        {name:'Created time',type: 'created_time', direction: 'descending'}
    ]
    const interesting = await queryAllNotionDatabaseAction({apiToken,database_id, filters, sorts})
    return {interesting}
}

export const getQuickCaptureDatabaseSummary = async ({apiToken, database_id}:any) => {
    let filters: any = []
    let sorts: any = [
        {name:'Created time',type: 'created_time', direction: 'descending'}
    ]
    const quickCapture = await queryAllNotionDatabaseAction({apiToken,database_id, filters, sorts})
    return {quickCapture}
}

export const getAreasDatabaseSummary = async ({apiToken, database_id}:any) => {
    let filters: any = []
    let sorts: any = [
        {name:'Created time',type: 'created_time', direction: 'descending'}
    ]
    const totalAreas = await queryAllNotionDatabaseAction({apiToken,database_id, filters, sorts})
    const selfAreas = totalAreas.results.filter((area:any) => area['Knowledge Type'] === 'Self')
    const notSelfAreas = totalAreas.results.filter((area:any) => area['Knowledge Type'] !== 'Self')
    const stillToCategorizeAreas = totalAreas.results.filter((area:any) => area['Self'].length === 0 && area['Others'].length === 0)

    return {totalAreas, selfAreas, notSelfAreas, stillToCategorizeAreas}
}

export const getBooksDatabaseSummary = async ({apiToken, database_id}:any) => {
    let filters: any = []
    let sorts: any = [
        {name:'Created time',type: 'created_time', direction: 'descending'}
    ]
    const allBooks = await queryAllNotionDatabaseAction({apiToken,database_id, filters, sorts})
    const toReadNonFictionBooks = allBooks.results.filter((book: any) => 
        book['Status'] === 'To Read' && !['Fiction', 'System Fiction', 'Fanfiction'].includes(book['Type'])
      );
      
      const readNonFictionBooks = allBooks.results.filter((book: any) => 
        ['Read', 'Notes in Progress', 'Ready for Publication', 'Published'].includes(book['Status']) && !['Fiction', 'System Fiction', 'Fanfiction'].includes(book['Type'])
      );
      
      const currentlyReadingNonFictionBooks = allBooks.results.filter((book: any) => 
        ['Currently Reading', 'Partially Read', 'Read But Unfinished'].includes(book['Status']) && !['Fiction', 'System Fiction', 'Fanfiction'].includes(book['Type'])
      );
      
      return { allBooks, toReadNonFictionBooks, readNonFictionBooks, currentlyReadingNonFictionBooks };
}

export const getSkillTreesDatabaseSummary = async ({apiToken, database_id}:any) => {
    let filters: any = []
    let sorts: any = [
        {name:'Created time',type: 'created_time', direction: 'descending'}
    ]
    const skillTrees = await queryAllNotionDatabaseAction({apiToken,database_id, filters, sorts})
    const parentSkillTrees = skillTrees.results.filter((skillTree:any) => skillTree['Parent-task'].length === 0)
    const leafSkillTrees = skillTrees.results.filter((skillTree:any) => skillTree['Sub-tasks'].length === 0)
    const selfSkillTrees = skillTrees.results.filter((skillTree:any) => skillTree['Self'].length > 0)
    const noSelfSkillTrees = skillTrees.results.filter((skillTree:any) => skillTree['Self'].length == 0)
    return {skillTrees, parentSkillTrees, leafSkillTrees, selfSkillTrees, noSelfSkillTrees}
}

