import React from 'react'

const BreadCrumb = ({ parents, onBreadcrumbClick }: any) => {
    return (
        <div className='flex items-center gap-2 mx-4'>
            {parents.map((parent: any, index: number) => (
                <div key={parent.id} className='flex items-center gap-2 cursor-pointer' onClick={() => onBreadcrumbClick(index)}>
                    <span>{parent["Skill Tree Name"]}</span>
                    {index !== parents.length - 1 && <span>/</span>}
                </div>
            ))}
        </div>
    )
}

export default BreadCrumb;
