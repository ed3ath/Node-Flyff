QUEST_2001 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000012',
	character = 'MaFl_Mikyel',
	end_character = 'MaFl_Mikyel',
	start_requirements = {
		min_level = 7,
		max_level = 11,
		job = { 'JOB_VAGRANT' },
		previous_quest = '',
	},
	rewards = {
		gold = 3500,
		exp = 70,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_UNKLETTER', quantity = 10, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000013',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000014',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000015',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000016',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000017',
		},
	}
}
