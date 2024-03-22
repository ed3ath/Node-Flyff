QUEST_2004 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000045',
	character = 'MaFl_Mikyel',
	end_character = 'MaFl_Mikyel',
	start_requirements = {
		min_level = 9,
		max_level = 11,
		job = { 'JOB_VAGRANT' },
		previous_quest = '',
	},
	rewards = {
		gold = 4500,
		exp = 202,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_MOP', quantity = 7, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000046',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000047',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000048',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000049',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000050',
		},
	}
}
