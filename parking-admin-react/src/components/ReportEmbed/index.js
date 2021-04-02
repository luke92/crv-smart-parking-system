import React from 'react'

const ReportEmbed = props => (
    <iframe
        src={`${props.report.url}`}
        title={`${props.report.name}`}
        frameBorder={0}
        width='100%'
        height='100%'
        allowTransparency
    />
)

export default ReportEmbed

