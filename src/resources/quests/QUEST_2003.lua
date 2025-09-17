QUEST_2003 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000034',
	character = 'MaFl_Mikyel',
	end_character = 'MaFl_Mikyel',
	start_requirements = {
		min_level = 8,
		max_level = 11,
		job = { 'JOB_VAGRANT' },
		previous_quest = '',
	},
	rewards = {
		gold = 4000,
		exp = 70,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_PEAKYRIND', quantity = 7, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000035',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000036',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000037',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000038',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000039',
		},
	}
}
