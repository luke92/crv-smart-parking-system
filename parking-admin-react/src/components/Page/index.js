import React from 'react'
import styled from 'styled-components'
import Header from '../../components/Header';
import SideBar from '../SideBar';

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100vh;
	background-color: ${({ theme }) => theme.colors.white};
`

const PageWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	height: calc(100% - 70px);
	width: 100%;
`

const PageBlock = styled.div`
	display: ${({ display }) => display ? display : 'flex'};
	flex-direction: ${({ direction }) => direction ? direction : 'column'};
	align-items: ${({ align }) => align ? align : 'center'};
	justify-content: ${({ justify }) => justify ? justify : 'stretch'};
	height: 100%;
	width: 100%;
	padding: ${({ padding }) => padding ? padding : '20px 28px'};
`

class Page extends React.Component {
	render() {
		const { withHeader, withSideBar, justify, align, display, direction, padding } = this.props
		return (
			<PageContainer>
				{withHeader && <Header />}
				<PageWrapper>
					{withSideBar && <SideBar />}
					<PageBlock align={align} justify={justify} display={display} direction={direction} padding={padding}>
						{this.props.children}
					</PageBlock>
				</PageWrapper>
			</PageContainer>
		)
	}
}

export default Page