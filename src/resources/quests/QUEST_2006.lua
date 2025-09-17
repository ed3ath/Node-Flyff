QUEST_2006 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000067',
	character = 'MaFl_Mikyel',
	end_character = 'MaFl_Mikyel',
	start_requirements = {
		min_level = 13,
		max_level = 15,
		job = { 'JOB_VAGRANT' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 1064,
		items = {
			{ id = 'II_GEN_POT_DRI_VITAL400', quantity = 20, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_SLAIN', quantity = 10, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000068',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000069',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000070',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000071',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000072',
		},
	}
}
