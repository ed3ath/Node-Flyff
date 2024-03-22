QUEST_2007 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000078',
	character = 'MaFl_Mikyel',
	end_character = 'MaFl_Mikyel',
	start_requirements = {
		min_level = 15,
		max_level = 19,
		job = { 'JOB_VAGRANT', 'JOB_ASSIST', 'JOB_MERCENARY', 'JOB_MAGICIAN', 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 1200,
		items = {
			{ id = 'II_GEN_REF_REF_FOUTH', quantity = 20, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_TARINROOT', quantity = 12, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000079',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000080',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000081',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000082',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000083',
		},
	}
}
