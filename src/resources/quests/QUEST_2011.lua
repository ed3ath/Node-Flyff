QUEST_2011 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000122',
	character = 'MaFl_Mikyel',
	end_character = 'MaFl_Mikyel',
	start_requirements = {
		min_level = 21,
		max_level = 26,
		job = { 'JOB_ASSIST', 'JOB_MERCENARY', 'JOB_MAGICIAN', 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = 10500,
		exp = 4600,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_BLUEHONEY', quantity = 15, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000123',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000124',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000125',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000126',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000127',
		},
	}
}
