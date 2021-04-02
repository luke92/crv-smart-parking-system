import React from 'react';
import AuditShow from 'components/AuditShow';
import Page from 'components/Page';
import SectionHeader from 'components/SectionHeader';

class Audit extends React.Component {

  render() {
    return (
      <Page align='space-between' withHeader withSideBar>
				<SectionHeader title={'Auditoría de operaciones y cambios en el sistema'} />
           <div className="row">
              <div className="col-12">
                <div id="Audit-Chart">
                    <AuditShow/>

                </div>
              </div>
            </div>
			</Page>
    );
  }

}

export default Audit