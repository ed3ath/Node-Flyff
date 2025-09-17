QUEST_2021 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000232',
	character = 'MaSa_Lancomi',
	end_character = 'MaSa_Lancomi',
	start_requirements = {
		min_level = 37,
		max_level = 42,
		job = { 'JOB_ASSIST', 'JOB_MERCENARY', 'JOB_MAGICIAN', 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = 37000,
		exp = 215514,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_DUMBLING', quantity = 30, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000233',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000234',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000235',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000236',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000237',
		},
	}
}
