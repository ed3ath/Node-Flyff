QUEST_2027 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000298',
	character = 'MaDa_Lurif',
	end_character = 'MaDa_Lurif',
	start_requirements = {
		min_level = 51,
		max_level = 56,
		job = { 'JOB_ASSIST', 'JOB_MERCENARY', 'JOB_MAGICIAN', 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = 153000,
		exp = 518850,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_TOMA', quantity = 40, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000299',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000300',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000301',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000302',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000303',
		},
	}
}
