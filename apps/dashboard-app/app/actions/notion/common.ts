
export const getDefaultDbFromContext = (name: string, context: any) => {
    switch (name) {
        case 'Accounts': return context.notionNode?.accountsDb
        case 'Transactions': return context.notionNode?.transactionsDb
        case 'BudgetPlan': return context.notionNode?.budgetPlanDb
        case 'MonthlyBudget': return context.notionNode?.monthlyBudgetDb
        case 'FinancialGoals': return context.notionNode?.financialGoalsDb
        case 'Projects': return context.notionNode?.projectsDb
        case 'Blogs': return context.notionNode?.blogsDb
        case 'Place Of Work': return context.notionNode?.placeOfWorkDb
        case 'Books': return context.notionNode?.booksDb
        case 'Quick Capture': return context.notionNode?.quickCaptureDb
        case 'Areas': return context.notionNode?.areasDb
        case 'Archive': return context.notionNode?.archiveDb
        case 'Interesting': return context.notionNode?.interestingDb
        case 'Podcasts': return context.notionNode?.podcastsDb
        case 'Channels': return context.notionNode?.channelsDb
        case 'Videos': return context.notionNode?.videosDb
        case 'Skill Trees': return context.notionNode?.skillTreesDb
        case 'Scheduler': return context.notionNode?.schedulerDb
        case 'Calendar': return context.notionNode?.calendarDb
        case 'Eisenhower Matrix': return context.notionNode?.eisenhowerMatrixDb
        case 'Actions': return context.notionNode?.actionsDb
        case 'Time Tracking': return context.notionNode?.timeTrackingDb
        case 'Weekly Planner': return context.notionNode?.weeklyPlannerDb
        case 'Social Sphere': return context.notionNode?.socialSphereDb
        case 'Passwords': return context.notionNode?.passwordsDb
        case 'Journal': return context.notionNode?.journalDb
        case 'Inventory': return context.notionNode?.inventoryDb
        case 'Status': return context.notionNode?.statusDb
        case 'Goals': return context.notionNode?.goalsDb
        case 'Rewards': return context.notionNode?.rewardsDb
        case 'Punishments': return context.notionNode?.punishmentsDb
        default: return null
    }
}