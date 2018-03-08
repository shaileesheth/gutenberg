/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * WordPress dependencies
 */
import { Fragment, compose } from '@wordpress/element';
import { __, _n, sprintf } from '@wordpress/i18n';
import { IconButton } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import { getActiveEditorPanel } from '../../store/selectors';
import { closeGeneralSidebar, setGeneralSidebarActivePanel } from '../../store/actions';

const SidebarHeader = ( { title, count, panel, onSetPanel, onCloseSidebar } ) => {
	// Do not display "0 Blocks".
	count = count === 0 ? 1 : count;

	return (
		<Fragment>
			<div className="components-panel__header edit-post-sidebar__header">
				<span className="edit-post-sidebar__title">
					{ title }
				</span>
				<IconButton
					onClick={ onCloseSidebar }
					icon="no-alt"
					label={ __( 'Close settings' ) }
				/>
			</div>
			<div className="components-panel__header edit-post-sidebar__panel-tabs">
				<button
					onClick={ () => onSetPanel( 'document' ) }
					className={ `edit-post-sidebar__panel-tab ${ panel === 'document' ? 'is-active' : '' }` }
					aria-label={ __( 'Document settings' ) }
				>
					{ __( 'Document' ) }
				</button>
				<button
					onClick={ () => onSetPanel( 'block' ) }
					className={ `edit-post-sidebar__panel-tab ${ panel === 'block' ? 'is-active' : '' }` }
					aria-label={ __( 'Block settings' ) }
				>
					{ sprintf( _n( 'Block', '%d Blocks', count ), count ) }
				</button>
				<IconButton
					onClick={ onCloseSidebar }
					icon="no-alt"
					label={ __( 'Close settings' ) }
				/>
			</div>
		</Fragment>
	);
};

export default compose(
	withSelect( ( select ) => ( {
		title: select( 'core/editor' ).getEditedPostAttribute( 'title' ),
		count: select( 'core/editor' ).getSelectedBlockCount(),
	} ) ),
	connect(
		( state ) => ( {
			panel: getActiveEditorPanel( state ),
		} ),
		{
			onSetPanel: setGeneralSidebarActivePanel.bind( null, 'editor' ),
			onCloseSidebar: closeGeneralSidebar,
		},
		undefined,
		{ storeKey: 'edit-post' }
	)
)( SidebarHeader );
