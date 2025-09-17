QUEST_NEWPETYORN = {
	title = 'IDS_PROPQUEST_INC_001327',
	character = 'MaFl_Loyah',
	end_character = 'MaFl_Loyah',
	start_requirements = {
		min_level = 5,
		max_level = 15,
		job = { 'JOB_VAGRANT' },
		previous_quest = '',
	},
	rewards = {
		gold = 15000,
		exp = 0,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_YORN', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001328',
			'IDS_PROPQUEST_INC_001329',
			'IDS_PROPQUEST_INC_001330',
			'IDS_PROPQUEST_INC_001331',
			'IDS_PROPQUEST_INC_001332',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001333',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001334',
		},
		completed = {
			'IDS_PROPQUEST_INC_001335',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001336',
		},
	}
}
