QUEST_2018 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000199',
	character = 'MaSa_Lancomi',
	end_character = 'MaSa_Lancomi',
	start_requirements = {
		min_level = 31,
		max_level = 36,
		job = { 'JOB_ASSIST', 'JOB_MERCENARY', 'JOB_MAGICIAN', 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = 31000,
		exp = 61300,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_GIGGLANDE', quantity = 30, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000200',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000201',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000202',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000203',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000204',
		},
	}
}
