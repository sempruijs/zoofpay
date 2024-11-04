import { NextPage } from "next"

interface FeatureProps {
    title: string,
    content: string,
    right: boolean
}

const Feature: NextPage<FeatureProps> = ({ title, content, right }) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: right ? '35% 65%' : '65% 35%',
                gridTemplateRows: '50% 50%',
                width: '100vw',
                height: '50vh',
                alignItems: 'center',
            }}
        >
            {right && (
                <div></div>
            )}
            <div
                style={{
                    padding: '5%'
                }}
            >
                <h3
                    style={{
                        fontSize: '5vw',
                        fontWeight: 'bold'
                    }}
                >{title}</h3>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default Feature;