QUEST_2009 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000100',
	character = 'MaFl_Mikyel',
	end_character = 'MaFl_Mikyel',
	start_requirements = {
		min_level = 17,
		max_level = 19,
		job = { 'JOB_ASSIST', 'JOB_MERCENARY', 'JOB_MAGICIAN', 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = 8500,
		exp = 1760,
		items = {
			{ id = 'II_SYS_BLI_TWO_TOWNBLINKWING', quantity = 20, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_STARSTONE', quantity = 14, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000101',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000102',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000103',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000104',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000105',
		},
	}
}
