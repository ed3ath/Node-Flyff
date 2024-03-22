QUEST_2008 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000089',
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
		exp = 1450,
		items = {
			{ id = 'II_GEN_FOO_COO_BARBECUE', quantity = 20, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_NYANYA', quantity = 10, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000090',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000091',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000092',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000093',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000094',
		},
	}
}
